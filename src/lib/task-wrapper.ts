import through from 'through'

import { BELL_REGEX, CLEAR_LINE_REGEX } from '@constants/clearline-regex.constants'
import { ListrTaskState } from '@constants/state.constants'
import { ListrError, ListrErrorTypes } from '@interfaces/listr-error.interface'
import { ListrBaseClassOptions, ListrSubClassOptions, ListrTask } from '@interfaces/listr.interface'
import { ListrRendererFactory } from '@interfaces/renderer.interface'
import { Task } from '@lib/task'
import { Listr } from '@root/listr'
import { createPrompt, destroyPrompt } from '@utils/prompt'
import { PromptOptions } from '@utils/prompt.interface'

/**
 * Extend the task to have more functionality while accesing from the outside.
 */
export class TaskWrapper<Ctx, Renderer extends ListrRendererFactory> {
  constructor (public task: Task<Ctx, ListrRendererFactory>, public errors: ListrError<Ctx>[], private options: ListrBaseClassOptions<Ctx, any, any>) {}

  /** Get the title of the current task. */
  get title (): string {
    return this.task.title
  }

  /** Change the title of the current task. */
  set title (data: string) {
    this.task.title$ = data
  }

  /** Get the output from the output channel. */
  get output (): string {
    return this.task.output
  }

  /** Send a output to the output channel. */
  set output (data: string) {
    this.task.output$ = data
  }

  /** Create a new subtask with given renderer selection from the parent task. */
  public newListr<NewCtx = Ctx>(
    task: ListrTask<NewCtx, Renderer> | ListrTask<NewCtx, Renderer>[] | ((parent: Omit<this, 'skip' | 'enabled'>) => ListrTask<NewCtx, Renderer> | ListrTask<NewCtx, Renderer>[]),
    options?: ListrSubClassOptions<NewCtx, Renderer>
  ): Listr<NewCtx, any, any> {
    let tasks: ListrTask<NewCtx, Renderer> | ListrTask<NewCtx, Renderer>[]

    if (typeof task === 'function') {
      tasks = task(this)
    } else {
      tasks = task
    }

    return new Listr<NewCtx, any, any>(tasks, options, this.task)
  }

  /** Report a error in process for error collection. */
  public report (error: Error, type: ListrErrorTypes): void {
    if (this.task.options.collectErrors !== false) {
      this.errors.push(new ListrError<Ctx>(error, type, this.task))
    }

    this.task.message$ = { error: error.message ?? this.task?.title ?? 'Task with no title.' }
  }

  /** Skip current task. */
  public skip (message?: string): void {
    this.task.state$ = ListrTaskState.SKIPPED

    if (message) {
      this.task.message$ = { skip: message ?? this.task?.title ?? 'Task with no title.' }
    }
  }

  /** Get the number of retrying, else returns false */
  public isRetrying (): Task<Ctx, Renderer>['retry'] {
    return this.task.isRetrying() ? this.task.retry : { count: 0 }
  }

  /**
   * Create a new Enquirer prompt using prompt options.
   *
   * Since process.stdout is controlled by Listr, this will passthrough all Enquirer data through internal stdout.
   */
  public async prompt<T = any>(options: PromptOptions | PromptOptions<true>[]): Promise<T> {
    return createPrompt.bind(this)(options, { ...this.options?.injectWrapper })
  }

  /** Cancels the current prompt attach to this task. */
  public cancelPrompt (throwError = false): void {
    return destroyPrompt.bind(this)(throwError)
  }

  /**
   * Pass stream of data to internal stdout.
   *
   * Since Listr2 takes control of process.stdout utilizing the default renderer, any data outputted to process.stdout
   * will corupt its looks.
   *
   * This returns a fake stream to pass any stream inside Listr as task data.
   */
  public stdout (): NodeJS.WriteStream & NodeJS.WritableStream {
    return through((chunk: string) => {
      chunk = chunk.toString()

      chunk = chunk.replace(new RegExp(CLEAR_LINE_REGEX, 'gmi'), '')
      chunk = chunk.replace(new RegExp(BELL_REGEX, 'gmi'), '')

      if (chunk !== '') {
        this.output = chunk
      }
    }) as unknown as NodeJS.WriteStream
  }

  /** Run this task. */
  public run (ctx: Ctx): Promise<void> {
    return this.task.run(ctx, this)
  }
}

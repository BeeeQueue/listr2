# Type alias: ListrEventFromType<T, E\>

[index](../modules/index.md).ListrEventFromType

Ƭ **ListrEventFromType**<`T`, `E`\>: `E` extends { `type`: infer U } ? `T` extends `U` ? `E` : `never` : `never`

Used to match event.type to ListrEvent permutations

#### Type parameters

| Name | Type                                                         |
| :--- | :----------------------------------------------------------- |
| `T`  | extends [`ListrEventType`](../enums/index.ListrEventType.md) |
| `E`  | [`ListrEvent`](index.ListrEvent.md)                          |

#### Defined in

[src/interfaces/listr.interface.ts:205](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/listr.interface.ts#L205)

# Type alias: ListrGetRendererValueFromClass<T\>

[index](../modules/index.md).ListrGetRendererValueFromClass

Ƭ **ListrGetRendererValueFromClass**<`T`\>: `T` extends [`DefaultRenderer`](../classes/renderer_default_renderer.DefaultRenderer.md) ? [`ListrDefaultRendererValue`](index.ListrDefaultRendererValue.md) : `T` extends [`SimpleRenderer`](../classes/renderer_simple_renderer.SimpleRenderer.md) ? [`ListrSimpleRendererValue`](index.ListrSimpleRendererValue.md) : `T` extends [`VerboseRenderer`](../classes/renderer_verbose_renderer.VerboseRenderer.md) ? [`ListrFallbackRendererValue`](index.ListrFallbackRendererValue.md) : `T` extends [`SilentRenderer`](../classes/renderer_silent_renderer.SilentRenderer.md) ? [`ListrSilentRenderer`](index.ListrSilentRenderer.md) : `T` extends [`ListrRendererFactory`](index.ListrRendererFactory.md) ? `T` : `never`

Returns the friendly names from the type of renderer classes.

#### Type parameters

| Name | Type                                                            |
| :--- | :-------------------------------------------------------------- |
| `T`  | extends [`ListrRendererFactory`](index.ListrRendererFactory.md) |

#### Defined in

[src/interfaces/renderer.interface.ts:49](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/renderer.interface.ts#L49)

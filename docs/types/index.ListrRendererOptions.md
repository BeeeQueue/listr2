[listr2](../README.md) / [index](../modules/index.md) / ListrRendererOptions

# Type alias: ListrRendererOptions<Renderer, FallbackRenderer\>

[index](../modules/index.md).ListrRendererOptions

Ƭ **ListrRendererOptions**<`Renderer`, `FallbackRenderer`\>: [`ListrDefaultRendererOptions`](../interfaces/index.ListrDefaultRendererOptions.md)<`Renderer`\> & [`ListrDefaultNonTTYRendererOptions`](../interfaces/index.ListrDefaultNonTTYRendererOptions.md)<`FallbackRenderer`\>

Renderer options for the base class, including setup for selecting default and fallback renderers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Renderer` | extends [`ListrRendererValue`](index.ListrRendererValue.md) |
| `FallbackRenderer` | extends [`ListrRendererValue`](index.ListrRendererValue.md) |

#### Defined in

src/interfaces/renderer.interface.ts:95
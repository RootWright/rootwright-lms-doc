/** "RootWright Night" — code highlighting in the brand palette. Used for both colour modes. */
export const rootwrightNight = {
  name: 'rootwright-night',
  type: 'dark' as const,
  colors: { 'editor.background': '#14231E', 'editor.foreground': '#F2EFE7' },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#93A79C', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.operator.new', 'keyword.control'], settings: { foreground: '#7FD4A9' } },
    { scope: ['string', 'string.quoted', 'string.template', 'markup.inline.raw'], settings: { foreground: '#FFD873' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: '#FFB09B' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call', 'variable.function'], settings: { foreground: '#A3D1FF' } },
    { scope: ['variable', 'variable.other', 'variable.parameter', 'punctuation.definition.variable'], settings: { foreground: '#FFB8D9' } },
    { scope: ['entity.name.type', 'entity.name.class', 'support.class', 'support.type', 'entity.other.inherited-class'], settings: { foreground: '#CBB9FF' } },
    { scope: ['entity.name.tag', 'meta.tag'], settings: { foreground: '#7FD4A9' } },
    { scope: ['entity.other.attribute-name', 'support.type.property-name', 'meta.object-literal.key'], settings: { foreground: '#A3D1FF' } },
    { scope: ['punctuation', 'meta.brace', 'keyword.operator'], settings: { foreground: '#D3DED7' } },
    { scope: ['markup.heading', 'entity.name.section'], settings: { foreground: '#7FD4A9', fontStyle: 'bold' } },
    { scope: ['markup.inserted'], settings: { foreground: '#8EE3BC' } },
    { scope: ['markup.deleted'], settings: { foreground: '#FFB09B' } }
  ]
}


export const withInlines = editor => {
    const { isInline, isVoid, markableVoid } = editor

    editor.isInline = element => {
      return element.type === 'tex' ? true : isInline(element)
    }
  
    editor.isVoid = element => {
      return element.type === 'tex' ? true : isVoid(element)
    }
  
    editor.markableVoid = element => {
      return element.type === 'tex' || markableVoid(element)
    }
  
    return editor
}

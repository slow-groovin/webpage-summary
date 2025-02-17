/**
 * scroll to by id
 * @param id
 */
export function scrollToId(id: string) {
	const element = document.getElementById(id)
  
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' })
	}else{
    const shadowElement=document.querySelector('webpage-summary')?.shadowRoot?.getElementById(id)
    console.log(shadowElement)
    if(shadowElement)
		  shadowElement.scrollIntoView({ behavior: 'smooth' })
  }
}

export function getLineHeightOfElement(e:HTMLElement):number{
    // 获取字体样式
  const style = window.getComputedStyle(e);

  // 获取字体大小和行高
  const fontSize = parseFloat(style.fontSize);
  const lineHeight = parseFloat(style.lineHeight);

  // 如果行高没有明确设置，通常会等于字体大小
  const effectiveLineHeight = lineHeight ? lineHeight : fontSize;
  return effectiveLineHeight
}
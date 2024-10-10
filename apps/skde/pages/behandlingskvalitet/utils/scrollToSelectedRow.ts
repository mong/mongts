export default function scrollToSelectedRow(selectedRow: string): boolean {
  if (!document) 
  {
    return false;
  }

  const element = document.getElementById(selectedRow);
  const headerOffset = 160;

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    return true;
  } else {
    return false;
  }
}

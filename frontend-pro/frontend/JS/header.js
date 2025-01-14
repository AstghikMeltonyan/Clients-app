export const createHeader1 = () => {
  const header = document.createElement('header'),
    logo = document.createElement('span'),
    search = document.createElement('input');

    header.classList.add('header');
    logo.classList.add('logo');
    search.classList.add('search');
    search.setAttribute('placeholder','Введите запрос')
    search.setAttribute('id','search');

    header.append(logo, search)

  return header
}
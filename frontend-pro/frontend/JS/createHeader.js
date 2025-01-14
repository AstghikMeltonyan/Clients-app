export const createClientsHeader = () => {
  const header = document.createElement('header');
  const logo = document.createElement('a');
  const logoSvg = document.createElement('span');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const inner = document.createElement('div');
  const findList = document.createElement('ul');

  findList.classList.add('find-list', 'hide');
  header.classList.add('header');
  container.classList.add('container', 'header__container');
  logo.classList.add('logo', 'header__logo');
  logoSvg.classList.add('logo__svg');
  form.classList.add('header__form');
  input.classList.add('header__input');
  wrapper.classList.add('header__wrapper');
  inner.classList.add('header__inner');
  input.placeholder = 'Введите запрос';

  inner.append(input, findList);
  header.append(container);
  logo.append(logoSvg);
  form.append(inner);
  container.append(logo, form);

  return header;
}
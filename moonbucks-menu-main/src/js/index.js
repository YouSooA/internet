const $ = (selector) => document.querySelector(selector);

const storage = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('menu'));
  },
};

function App() {
  // 상태 - 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  // 페이지를 최초로 로딩할 때 localStorage에 에스프레소 메뉴를 읽어온다
  this.currentCategory = 'espresso';
  this.init = () => {
    // 객체에 데이터가 존재하면 localStorage에서 데이터 불러오기
    if (storage.getLocalStorage()) {
      this.menu = storage.getLocalStorage();
    }
    render();
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="${
            menuItem.soldOut ? 'sold-out' : ''
          } w-100 pl-2 menu-name">${menuItem.name}</span>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
            >
              품절
            </button>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >
              수정
            </button>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >
              삭제
            </button>
        </li>`;
      })
      .join('');
    $('#menu-list').innerHTML = template;
    updateMenuCount();
  };

  const addMenu = () => {
    if (
      $('#menu-name').value === '' ||
      $('#menu-name').value.replace(/\s/g, '') === ''
    ) {
      return alert('신메뉴를 입력해주세요.');
    }
    const espressoMenuName = $('#menu-name').value;
    this.menu[this.currentCategory].push({ name: espressoMenuName });
    storage.setLocalStorage(this.menu);
    render();
    $('#menu-name').value = '';
  };
  const updateMenuCount = () => {
    const menuCount = $('#menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };
  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    storage.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };
  const removeMenuName = (e) => {
    if (confirm('정말로 삭제할 건가요?')) {
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      storage.setLocalStorage(this.menu);
      e.target.closest('li').remove();
      updateMenuCount();
    }
  };
  const soldOutMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    storage.setLocalStorage(this.menu);
    render();
  };
  $('#menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });
  $('#menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
      return;
    }
    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
      return;
    }
    if (e.target.classList.contains('menu-sold-out-button')) {
      soldOutMenuName(e);
      return;
    }
  });
  $('#menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenu();
  });
  $('#menu-submit-button').addEventListener('click', addMenu);

  $('nav').addEventListener('click', (e) => {
    const isCategoryButton = e.target.classList.contains('cafe-category-name');
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
      console.log(e.target);
      render();
    }
  });
}
const app = new App();
app.init();

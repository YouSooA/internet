// step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기
// Todo 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 새로운 메뉴가 추가 된다.
// - [x] 메뉴의 이름을 입력 받고 확인 버튼으로 새로운 메뉴가 추가 된다.
// - [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// Todo 메뉴 수정
// - [x] 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴 수정하는 모달창(prompt)을 띄운다.
// - [x] 모달창(prompt)에 메뉴 이름을 수정하고, 확인 버튼을 누르면 메뉴가 수정된다.

// Todo 메뉴 삭제
// - [x] 메뉴 삭제 버튼클릭 이벤트를 받고, 메뉴를 삭제하는 모달창(confirm)을 띄운다.
// - [x] 모달창(confirm)에 확인 버튼을 누르면 해당 메뉴는 삭제된다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

const $ = (selector) => document.querySelector(selector);

function App() {
  const addMenu = () => {
    if (
      $('#espresso-menu-name').value === '' ||
      $('#espresso-menu-name').value.replace(/\s/g, '') === ''
    ) {
      return alert('신메뉴를 입력해주세요.');
    }
    const espressoMenuName = $('#espresso-menu-name').value;
    const menuItemTemplate = (espressoMenuName) => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
    };
    $('#espresso-menu-list').insertAdjacentHTML(
      'beforeend',
      menuItemTemplate(espressoMenuName)
    );
    updateMenuCount();
    $('#espresso-menu-name').value = '';
  };
  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };
  const updateMenuName = (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };
  const removeMenuName = (e) => {
    if (confirm('정말로 삭제할 건가요?')) {
      e.target.closest('li').remove();
      updateMenuCount();
    }
  };
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });
  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }
    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenu();
  });
  $('#espresso-menu-submit-button').addEventListener('click', addMenu);
}
App();

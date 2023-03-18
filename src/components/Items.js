import Component from '../core/Component.js';
export default class Items extends Component {
  setup() {
    this.state = { items: ['item1', 'item2'] };
  }
  template() {
    const { items } = this.state;
    return `
      <ul>
        ${items
          .map(
            (item, key) => `
          <li>
            ${item}
            <button class="deleteBtn" data-index="${key}">삭제</button>
          </li>
        `
          )
          .join('')}
      </ul>
      <button class="addBtn">추가</button>
    `;
  }

  setEvent() {
    // render할 때마다 이벤트를 새로 등록하지 말고 이벤트 버블링을 통해 처음 랜더링 시에 모든 이벤트를 등록한다.
    this.$target.addEventListener('click', ({ target }) => {
      const items = [...this.state.items];

      if (target.classList.contains('addBtn')) {
        this.setState({ items: [...items, `item${items.length + 1}`] });
      }

      if (target.classList.contains('deleteBtn')) {
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      }
    });
  }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

function init() {
    const data = {
        name: 'Каталог товаров',
        hasChildren: true,
        items: [
            {
                name: 'Мойки',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran1',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT1',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT2',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'Ulgran2',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT3',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT4',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    }
                ]
            },{
                name: 'Фильтры',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran3',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT5',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT6',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    }
                ]
            }
        ]
    }


    const items = new ListItems(document.getElementById('list-items'), data)


    items.render()
    items.init()

    /*console.log(items.renderTest(data));*/

    function ListItems(el, data) {
        this.el = el;
        this.data = data;

        this.init = function () {
            const parents = this.el.querySelectorAll('[data-parent]')

            parents.forEach(parent => {
                const open = parent.querySelector('[data-open]')

                open.addEventListener('click', () => this.toggleItems(parent) )
            })
        }

        this.render = function () {
            this.el.insertAdjacentHTML('beforeend', this.renderParent(this.data))
        }

        this.renderParent = function (data) {
            //проверка всех элементов на hasChildren
            //если hasChildren, то запускаем renderParent
            if (data.hasChildren) {
                const childrenContent = data.items
                    //перебор каждой подкатегории (childItem) и рекурсивно вызывается renderParent.
                    .map(childItem => this.renderParent(childItem))
                    .join('');
                //возвращает рендер родительского элемента
                return `
                <div class="list-item list-item_open" data-parent>
                    <div class="list-item__inner">
                        <img src="img/chevron-down.png" alt="chevron" class="list-item__arrow" data-open>
                        <img src="img/folder.png" alt="folder" class="list-item__folder">
                        <span>${data.name}</span>
                    </div>
                    <div class="list-item__items">
                        ${childrenContent}
                    </div>
                </div>`
            }

            //если !hasChildren, то запускаем renderChildren
            return this.renderChildren(data);
        }

        this.renderChildren = function (data) {
            //вовзращает рендер элемента без вложенности
            return `
            <div class="list-item">
                <div class="list-item__inner">
                    <img src="img/folder.png" alt="folder" class="list-item__folder">
                    <span>${data.name}</span>
                </div>
            </div>`
        }


        this.toggleItems = function (parent) {
            parent.classList.toggle('list-item_open')
        }

        /*        this.renderTest = function (data) {
                    return `
                    <div class="test">${data.name}</div>
                    `
                }*/
    }

}
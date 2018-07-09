
let model = (function() {

    const lists = [
        {
            id: '_8er9bgfka',
            title: 'My first list',
            cards: []
        }
    ];

    const members = [];

    const idGenerator = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    const saveModelToLocalStorage = function () {
        const listsJSON = JSON.stringify(model.lists);
        const membersJSON = JSON.stringify(model.members);
        localStorage.setItem('modelLists', listsJSON);
        localStorage.setItem('modelMembers', membersJSON);
    }

    const addList = function () {
        let newList = {
            id: idGenerator(),
            title: '(no title)',
            cards: []
        }
        model.lists.push(newList);
        saveModelToLocalStorage();
    }

    return {
        lists: lists,
        members: members,
        addList: addList
    };
})();
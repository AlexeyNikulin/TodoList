import React from 'react';
import TodoListItem from '../todo-list-item';

import './todo-list.css';

const TodoList = ({todos, onDeleted, onToggleDone, onToggleImportant}) => {
    const elements = todos.map((item) => {

        const { id, style, ...itemProps } = item;

        return (
            <li style={style} key={id} className="list-group-item">
                <TodoListItem {...itemProps}
                onDeleted={ () => onDeleted(id) }
                onToggleDone={() => onToggleDone(id)}
                onToggleImportant={() => onToggleImportant(id)}/> 
            </li> // // более короткий код
            // <li><TodoListItem label={item.label} important={item.important} id={i}/></li> более длинный код
        )
    });

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    )
};

export default TodoList;
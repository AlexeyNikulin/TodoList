import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

export default class App extends Component {

	maxId = 100;

	creactTodoItem = (label) => {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++,
			style: {
				display: 'block'
			},
		}
	}

	state = {
		todoData: [
			this.creactTodoItem('Drink Coffee'),
			this.creactTodoItem('Make Awesome App'),
			this.creactTodoItem('Have a lunch')
		],
		filter: 'all'
	}

	onFilterChange = (name) => {
		this.setState({
			filter: name
		})
	}

	filterItems(items, filter) {
		switch(filter) {
			case 'all':
				return items;
			case 'active': 
				return items.filter((item) => !item.done);
			case 'done': 
				return items.filter((item) => item.done);
			default:
				return items;
		}
	}

	onChangeSearchText = (text) => {
		this.setState(({todoData}) => {
			const newArr = todoData.map(item => {
				if (item.label.toLowerCase().indexOf(text.toLowerCase()) === -1) {
					return {...item, style: {display: 'none'}};
				} else {
					return {...item, style: {display: 'block'}};
				}
			});
			return {
				todoData: newArr
			}
		}); 	
	}

	deleteItem = (id) => {
		this.setState(({todoData}) => {
			const i = todoData.findIndex(el => el.id === id);
			return {
				todoData: [...todoData.slice(0, i), ...todoData.slice(i + 1)]
			}
		});
	};

	addItem = (text) => {
		const newItem = this.creactTodoItem(text);

		this.setState(({todoData}) => {
			return {
				todoData: [...todoData.slice(0, todoData.length), newItem]
			}
		});
	};

	toggleProperty = (arr, id, propName) => {
		const i = arr.findIndex(el => el.id === id);
		const item = {...arr[i], [propName]: !arr[i][propName]};
		return [...arr.slice(0, i), item, ...arr.slice(i + 1)]
		
	}

	onToggleImportant = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, "important")
			}
		});
	}

	onToggleDone = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, "done")
			}
		});
	}

	render() {
		const {todoData, filter} = this.state,
			  doneCount = todoData.filter(item => item.done).length,
			  todoCount = todoData.length - doneCount,
			  visible = this.filterItems(todoData, filter);
		return (
			<div className="todo-app">
			  <AppHeader toDo={todoCount} done={doneCount} />
			  <div className="top-panel d-flex">
				<SearchPanel onChangeSearchText={this.onChangeSearchText}/>
				<ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
			  </div>
		
			  <TodoList 
				todos={visible}
				onDeleted={this.deleteItem}
				onToggleImportant={this.onToggleImportant}
				onToggleDone={this.onToggleDone}
				/>
			  <ItemAddForm onAddItem={ this.addItem }/>
			</div>
		);
	}
}




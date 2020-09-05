import React, {Component} from 'react';
import './todo-list-item.css';


export default class TodoListItem extends Component {
	render() {
		const {label, onDeleted, onToggleDone, onToggleImportant, done, important} = this.props;

		let className = "todo-list-item";
		if (done) {
			className += ' done';
		}
		if (important) {
			className += ' important';
		}

		return (
			<span className={className}>
				<span
					className="todo-list-item-label"
					onClick={ onToggleDone }>
					{label}
				</span>
			
				<button onClick={onToggleImportant} type="button"
						className="btn btn-outline-success btn-sm float-right">
					<i className="fa fa-exclamation" />
				</button>

				<button onClick={onDeleted} type="button"
						className="btn btn-outline-danger btn-sm float-right">
					<i className="fa fa-trash-o" />
				</button>
			</span>
		);
	};
};
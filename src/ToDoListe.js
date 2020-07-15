import React from "react";

import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
//import { TextField } from "office-ui-fabric-react/lib/TextField";
//import { IconButton } from "office-ui-fabric-react/lib/Button";

// import { addItems, updateItems, removeItems,
import { todos } from "./TodoItemsData";
import "./styles.css";

// Hilfsfunktionen

let dragMeElement = {};
//let dragMeIndex = undefined;
export default class ToDoListe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: todos,
      textfieldValue: "",
      anzahlFertige: 0,
      textToUpdate: "",
      widgetEditMode: false
    };
  }

  toggleFertig(sortIndex) {
    const todosCopy = [...this.state.todos];
    const index = todosCopy.findIndex(a => a.sortIndex === sortIndex);
    const selectedItemCopy = { ...todosCopy[index] };
    todosCopy[index] = {
      ...selectedItemCopy,
      fertig: !selectedItemCopy.fertig
    };

    this.setState({ todos: todosCopy });
  }

  render() {
    const todos = this.state.todos.sort((a, b) => a.sortIndex - b.sortIndex);

    return (
      <div className="container">
        {todos.map(elm => {
          return (
            <div
              key={elm.id}
              className="todoContainer"
              style={{ display: "flex" }}
              draggable="true"
              onDragStart={e => this.ondragStart(e, elm)}
              onDragOver={e => e.preventDefault()}
              onDrop={e => this.onDrop(e, elm)}
              onDragEnter={e => {
                e.preventDefault();
              }}
            >
              <Checkbox
                onChange={() => this.toggleFertig(elm.sortIndex)}
                label={elm.name}
                id={elm.key}
                checked={elm.fertig}
                name={elm.name}
              />

              <span
                className={elm.fertig ? "fertig" : ""}
                onDoubleClick={() =>
                  this.onToggleEdit(elm.key, `input_${elm.key}`, elm.Title)
                }
              >
                {elm.Title}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  // Kram für Drag&Drop Resortierungs-Kram

  ondragOver = (event, elm) => {
    event.preventDefault();
  };

  ondragStart = (event, elm) => {
    dragMeElement = elm;
  };

  onDrop = (event, elm) => {
    event.preventDefault();

    const { sortIndex: indexOfDrag } = dragMeElement;
    const { sortIndex: indexOfDrop } = elm;

    if (indexOfDrag > indexOfDrop) {
      let todosCopy = [...this.state.todos];
      const dragCopy = { ...todosCopy[indexOfDrag], sortIndex: indexOfDrop };
      const dropCopy = { ...todosCopy[indexOfDrop], sortIndex: indexOfDrag };
      todosCopy[indexOfDrag] = dragCopy;
      todosCopy[indexOfDrop] = dropCopy;

      this.setState({ todos: todosCopy });
    }
  };
}

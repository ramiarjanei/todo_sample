import React, { Component } from "react";
import { showModal, hideModal, addTask, editTask, deleteTask } from "./actions";
import Modal from "./Modal";
import Form from "./Form";
import Tasks from "./Tasks";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      editedTask: {
        name: "",
        deadline: "",
        completed: false,
        NotStarted:false,
      },
      selectedTaskIndex: null,
      isModalVisible: false,
      showEditModal:false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
  }

  handleChange(changes) {
    this.setState((prevState) => ({
      editedTask: {
        ...prevState.editedTask,
        ...changes,
      },
    }));
  }

  handleAddTask(editedTask) {
    this.setState({isModalVisible: false})
    this.setState(addTask.bind(this, editedTask));
  }

  handleEditTask(selectedTaskIndex) {
    this.setState({isModalVisible:true, showEditModal:false})
    this.setState(editTask.bind(this, selectedTaskIndex));
  }

  handleDeleteTask(selectedTaskIndex) {
    this.setState(deleteTask.bind(this, selectedTaskIndex));
  }

  handleShowModal(selectedTaskIndex) {
    this.setState({isModalVisible:false, showEditModal:true})
    this.setState(showModal.bind(this, selectedTaskIndex));
  }

  handleHideModal() {
    this.setState(hideModal.bind(this));
  }

  render() {
    const { tasks, editedTask } = this.state;

    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">To-Do list</h1>
        </header>
        <button className="btn-add-task"   onClick={()=> this.setState({isModalVisible:true})}>Add a new Todo </button>
        {this.state.isModalVisible ? (

  <Form
  task={editedTask}
  onChange={this.handleChange}
  onSubmit={this.handleAddTask}
  />
        
        ) : (
        //   <Modal
        //   task={editedTask}
        //   onChange={this.handleChange}
        //   onSubmit={this.handleEditTask}
        //   onClose={this.handleHideModal}
        // />
        <div>
          {/* <p>asda</p> */}
        </div>
        )}

        {
          this.state.showEditModal ? (
                 <Modal
          task={editedTask}
          onChange={this.handleChange}
          onSubmit={this.handleEditTask}
          onClose={this.handleHideModal}
        />
          ):
          ""
        }
        {this.state.tasks.length !== 0 ? (
          <Tasks
            tasks={tasks}
            onClickEdit={this.handleShowModal}
            onClickDelete={this.handleDeleteTask}
          />
        ) : (
          <div>
            {/* <p>In second</p> */}
          </div>
        )}
      </div>
    );
  }
}

export default App;

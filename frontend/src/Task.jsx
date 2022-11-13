import { useEffect, useState } from 'react'
const { abi, contractAddress } = require('./abi')
const Web3 = require('web3')
var web3 = new Web3(
  new Web3.providers.WebsocketProvider('ws://127.0.0.1:8545/'),
)
var TaskFactory = new web3.eth.Contract(abi, contractAddress)

const Task = ({ task = null, reloadTasks }) => {
  return (

    <div
      className="
        basis-1/3 m-2 relative 
        "
    >
      <div className="p-2">
        <div
          className="
          flex
          -mb-2 ml-9
          "
        >
          {task.labels.length > 0 && task.status === '5' ? (
            <div  className="mx-2 bg-gray-600 px-2 rounded-full">
            Archived
          </div>
          ) : task.status === '6' ? (
            <div  className="mx-2 bg-gray-600 px-2 rounded-full">
                  Deleted
                </div>
          ) : (
            task.labels.map((label, i) => {
              return (
                <div key={i} className="mx-2 bg-gray-600 px-2 rounded-full">
                  {label}
                </div>
              )
            })
          )}
        </div>
        <div
          className="
          p-2 px-3 rounded bg-gray-800 
          flex 
          "
        >
          <span
            className={
              'grow-0 material-symbols-rounded mr-2 cursor-pointer ' +
              (parseInt(task.status) >=4 ? 'invisible' : '')
            }
            onClick={(e) => {
              if (window.confirm('Complete this task?')) {
                TaskFactory.methods
                  .updateTaskStatus(task.id, 4)
                  .send(
                    { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' },
                    (err, resp) => {
                      if (!err) {
                        alert('Task Completed.')
                        reloadTasks()
                      } else {
                        console.log(err)
                      }
                    },
                  )
              }
            }}
          >
            done
          </span>
          <div className={'grow '}>
            <div className={task.status === '4' ? ' line-through ' : ''}>
              {task.taskDescription}
            </div>
          </div>
          {parseInt(task.status) <5 && <span
            className={'grow-0 material-symbols-rounded mx-2 cursor-pointer '}
            onClick={(e) => {
              console.log(e.target.parentElement.parentElement)
              e.target.parentElement.parentElement.classList.add('blur-sm')
              e.target.parentElement.parentElement.nextElementSibling.classList.remove(
                'z-[-1]',
              )
              e.target.parentElement.parentElement.nextElementSibling.classList.add(
                'z-1',
              )
            }}
          >
            more_horiz
          </span>}
        </div>
      </div>
      <div
        className="
          absolute top-0 w-full h-full text-4xl z-[-1]
          flex justify-center items-center
          "
      >
        <span
          className="material-symbols-rounded mx-3 cursor-pointer "
          onClick={(e) => {
            let label
            do {
              label = window.prompt('Please enter a label for the task.')
            } while (label.trim() == '')
            TaskFactory.methods
              .updateTaskLabel(task.id, label)
              .send(
                { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' },
                (err, resp) => {
                  if (!err) {
                    alert('Task Label Updated.')
                    e.target.parentElement.classList.add('z-[-1]')
                    e.target.parentElement.classList.remove('z-1')
                    e.target.parentElement.parentElement.firstChild.classList.remove(
                      'blur-sm',
                    )
                    reloadTasks()
                  } else {
                    console.log(err)
                  }
                },
              )
          }}
        >
          label
        </span>
        <span
          className="material-symbols-rounded mx-3 cursor-pointer"
          onClick={(e) => {
            let newAssignee
            do {
              newAssignee = window.prompt(
                'Please enter an address to assign the task.',
              )
            } while (newAssignee.trim().length != 42)
            TaskFactory.methods
              .updateAssignee(task.id, newAssignee)
              .send(
                { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' },
                (err, resp) => {
                  if (!err) {
                    alert('Task Assigned to ' + newAssignee)
                    e.target.parentElement.classList.add('z-[-1]')
                    e.target.parentElement.classList.remove('z-1')
                    e.target.parentElement.parentElement.firstChild.classList.remove(
                      'blur-sm',
                    )
                    reloadTasks()
                  } else {
                    console.log(err)
                  }
                },
              )
          }}
        >
          send
        </span>
        <span
          className="material-symbols-rounded mx-3 cursor-pointer"
          onClick={(e) => {
            if (window.confirm('Archive this task?')) {
              TaskFactory.methods
                .updateTaskStatus(task.id, 5)
                .send(
                  { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' },
                  (err, resp) => {
                    if (!err) {
                      alert('Task Archived.')
                      e.target.parentElement.classList.add('z-[-1]')
                      e.target.parentElement.classList.remove('z-1')
                      e.target.parentElement.parentElement.firstChild.classList.remove(
                        'blur-sm',
                      )
                      reloadTasks()
                    } else {
                      console.log(err)
                    }
                  },
                )
            }
          }}
        >
          archive
        </span>
        <span
          className="material-symbols-rounded mx-3 cursor-pointer"
          onClick={(e) => {
            if (window.confirm('Delete this task?')) {
              TaskFactory.methods
                .updateTaskStatus(task.id, 6)
                .send(
                  { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' },
                  (err, resp) => {
                    if (!err) {
                      alert('Task Deleted.')
                      e.target.parentElement.classList.add('z-[-1]')
                      e.target.parentElement.classList.remove('z-1')
                      e.target.parentElement.parentElement.firstChild.classList.remove(
                        'blur-sm',
                      )
                      reloadTasks()
                    } else {
                      console.log(err)
                    }
                  },
                )
            }
          }}
        >
          delete
        </span>
        <span
          className="material-symbols-rounded mx-3 cursor-pointer"
          onClick={(e) => {
            e.target.parentElement.classList.add('z-[-1]')
            e.target.parentElement.classList.remove('z-1')
            e.target.parentElement.parentElement.firstChild.classList.remove(
              'blur-sm',
            )
          }}
        >
          close
        </span>
      </div>
    </div>
  )
}

export default Task

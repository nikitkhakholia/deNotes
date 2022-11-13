import { useEffect, useState } from 'react'
import Task from './Task'
const { abi, contractAddress } = require('./abi')
const Web3 = require('web3')
var web3 = new Web3(
  new Web3.providers.WebsocketProvider('ws://127.0.0.1:8545/'),
)
var TaskFactory = new web3.eth.Contract(abi, contractAddress)

const App = () => {
  

  useEffect(() => {
    console.log('Requesting account...')
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      console.log('Found')
      // web3 = new Web3(web3.currentProvider)
      getAllTasks()
    } else {
      // Handle the case where the user doesn't have Metamask installed
      // Probably show them a message prompting them to install Metamask
      console.log('No web3 provider found..')
    }
  }, [])

  const [tasks, setTasks] = useState([])

  const getAllTasks = async () => {
    console.log(await web3.eth.getAccounts())
    try {
      TaskFactory.methods.getTasksByAssignee().call((err, result) => {
        if (!err) {
          setTasks(result)
        } else {
          console.log(err)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-black text-white h-screen">
      <h1 className="font-black text-5xl p-3 text-center">deNotes</h1>
      <div className="flex justify-center ">
        <div className="lg:basis-6/12 md:basis-8/12 sm:basis-10/12 basis-11/12 ">
          <div
            className="
             relative hidden transition-all
            "
          >
            <input
              id="taskDescription"
              name="taskDescription"
              type="text"
              className="
                  w-full border-b-2 p-2 px-4 
                  border-white text-gray-800 rounded placeholder-gray-800 italic
                  focus:outline-none focus:border-gray-400 focus:placeholder-gray-400
                  "
              onChange={(e) => {
                if (e.target.value.trim().length > 0) {
                  e.target.nextElementSibling.classList.remove('hidden')
                } else {
                  e.target.nextElementSibling.classList.add('hidden')
                }
              }}
              placeholder="Enter a new Note"
            />
            <span
              className="
              material-symbols-rounded 
              absolute right-0 hidden px-1
              text-4xl cursor-pointer rounded-full text-green-500
              "
              onClick={(e) => {
                TaskFactory.methods
                  .createTask(e.target.previousElementSibling.value)
                  .send(
                    { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' },
                    (err, resp) => {
                      if (!err) {
                        getAllTasks()

                        document.getElementById('taskDescription').value = ''
                        e.target.parentElement.classList.add('hidden')
                        e.target.parentElement.nextElementSibling.classList.remove(
                          'hidden',
                        )
                      } else {
                        console.log(err)
                      }
                    },
                  )
              }}
            >
              done
            </span>
          </div>
          <div className="text-center">
            <span
              className="
              material-symbols-rounded 
              text-4xl cursor-pointer rounded-full
              "
              onClick={(e) => {
                document
                  .getElementById('taskDescription')
                  .parentElement.classList.remove('hidden')
                e.target.parentElement.classList.add('hidden')
              }}
            >
              add_circle
            </span>
          </div>

          {tasks.length > 0 ? (
            tasks.map((task, index) => {
              return (
                task.id !== "0" && (
                  <Task key={index} task={task} reloadTasks = {getAllTasks}/>
                )
              )
              // return task.id!==0 && <Task task={task}/>
            })
          ) : (
            <div>No tasks found.</div>
          )}
        </div>
      </div>
    </div>
  )
}
export default App

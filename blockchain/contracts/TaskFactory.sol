// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.6;
import "hardhat/console.sol";

contract TaskFactory {
    // task count ie id of latest task added
    uint256 public taskCount = 0;

    // task structure
    struct Task {
        uint256 id;
        uint256 date;
        string taskDescription;
        string[] labels;
        address assignee;
        uint8 status;
    }

    // task's id to task
    mapping(uint256 => Task) public tasks;

    // function to create task
    function createTask(string memory _taskDescription) public {
        taskCount++;
        Task memory task = Task(
            taskCount,
            block.timestamp,
            _taskDescription,
            new string[](0),
            msg.sender,
            0
        );
        tasks[taskCount] = task;
    }

    // function to add task label
    function updateTaskLabel(uint256 _taskId, string calldata _label) public {
        require(tasks[_taskId].assignee == msg.sender);
        tasks[_taskId].labels.push(_label);
    }

    // function get all task labels
    function getTaskLabels(uint256 _taskId)
        external
        view
        returns (string[] memory)
    {
        require(tasks[_taskId].assignee == msg.sender);
        return tasks[_taskId].labels;
    }

    // function to update task status
    function updateTaskStatus(uint256 _taskId, uint8 _status) external {
        require(tasks[_taskId].assignee == msg.sender);
        tasks[_taskId].status = _status;
    }

    // function to update task assignee
    function updateAssignee(uint256 _taskId, address _newAssignee) external {
        require(tasks[_taskId].assignee == msg.sender);
        tasks[_taskId].assignee = _newAssignee;
    }

    // all tasks by asignee
    function getTasksByAssignee() public  view returns (Task[] memory){
        if(taskCount==0) revert("No Tasks Found") ;
        Task[] memory _tasks = new Task[](taskCount);
        uint _arrayIndex=0;
        for(uint _loop = 1; _loop<=taskCount;_loop++){
            if(msg.sender==tasks[_loop].assignee){
                _tasks[_arrayIndex]=tasks[_loop];
                _arrayIndex++;
            }
            
        }
        return _tasks;
    }
}

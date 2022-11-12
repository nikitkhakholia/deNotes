const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_taskDescription",
                "type": "string"
            }
        ],
        "name": "createTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
            }
        ],
        "name": "getTaskLabels",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTasksByAssignee",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "taskDescription",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "labels",
                        "type": "string[]"
                    },
                    {
                        "internalType": "address",
                        "name": "assignee",
                        "type": "address"
                    },
                    {
                        "internalType": "uint8",
                        "name": "status",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct TaskFactory.Task[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "taskCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tasks",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "taskDescription",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "assignee",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_newAssignee",
                "type": "address"
            }
        ],
        "name": "updateAssignee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_label",
                "type": "string"
            }
        ],
        "name": "updateTaskLabel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "_status",
                "type": "uint8"
            }
        ],
        "name": "updateTaskStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
module.exports = {abi, contractAddress}
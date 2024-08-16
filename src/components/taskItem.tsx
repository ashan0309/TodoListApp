import React from 'react';
import { Task } from '../types/types';
import { useDispatch } from 'react-redux';
import { changeTaskStatus, removeTask } from '../redux/tasksSlice';
import { AppDispatch } from '../redux/store';
import { List, Button } from 'antd';

interface TaskItemProps {
    task: Task;
    index: number;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(({ task, index }) => {

    const dispatch: AppDispatch = useDispatch();
    return (
        <List.Item
            actions={[
                <Button type="link" onClick={() => dispatch(changeTaskStatus(task.id))}>
                    {task.status ? 'Mark as Undone' : 'Mark as Done'}
                </Button>,
                <Button type="link" danger onClick={() => dispatch(removeTask(task.id))}>
                    Delete
                </Button>,
            ]}
        >
            <List.Item.Meta
                title={`${index + 1}. ${task.title}`}
                description={task.status ? 'Done' : 'Not Done'}
            />
        </List.Item>
    );
});

export default TaskItem;

import React, {useEffect} from 'react';
import TaskItem from './taskItem';
import { RootState, AppDispatch } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/tasksSlice';
import { List, Spin } from 'antd';

const TaskList: React.FC = React.memo(() => {
    const dispatch: AppDispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    useEffect(() => {
        dispatch(fetchTasks(''));
    }, [dispatch]);

    const loading = useSelector((state: RootState) => state.tasks.loading);
    if (loading) {
        return <Spin tip="Loading tasks..." />;
    }

    return (
        <List
            bordered
            dataSource={tasks}
            renderItem={(task, index) => (
                <TaskItem
                        key={task.id}
                        task={task}
                        index={index}
                />
            )}
        />
    );
});

export default TaskList;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/tasksSlice';
import { AppDispatch } from '../redux/store';
import { Form, Input, Button } from 'antd';

const TaskForm: React.FC = React.memo(() => {
    const [title, setTitle] = useState('');
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            dispatch(createTask(title));
            setTitle("");
        }
    };

    return (
        <Form layout="inline">
            <Form.Item>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new task"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={(e) => handleSubmit(e)}>
                    Add Task
                </Button>
            </Form.Item>
        </Form>
    );
});

export default TaskForm;

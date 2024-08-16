import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/tasksSlice';
import { AppDispatch } from '../redux/store';
import { Input } from 'antd';

const SearchBar: React.FC = React.memo(() => {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch: AppDispatch= useDispatch();

    useEffect(() => {
        const getSearchTask = () => {
            try {
                dispatch(fetchTasks(searchQuery));
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const debouncedFetch = debounce(() => {
            getSearchTask();
        }, 300);
        debouncedFetch();

        return () => {
            debouncedFetch.cancel();
        };
    }, [searchQuery, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    return (
        <Input
            value={searchQuery}
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => handleInputChange(e)}
        />
    );
});

export default SearchBar;


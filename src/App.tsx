import React from 'react';
import TaskList from './components/taskList';
import TaskForm from './components/taskForm';
import SearchBar from './components/searchBar';
import { Layout, Typography, Space } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#0e2386', padding: '10px 20px' }}>
                <Title level={3} style={{ color: '#fff', textAlign: 'center' }}>
                    TODO List
                </Title>
            </Header>
            <Content style={{ padding: '20px 50px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <SearchBar />
                    <TaskForm/>
                    <TaskList/>
                </Space>
            </Content>
        </Layout>
    );
};

export default App;

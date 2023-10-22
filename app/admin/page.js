'use client';

const AdminHome = () => {
    let user
    if (process.browser) {
        user = JSON.parse(localStorage.getItem('pocketbase_auth')).model;
    }
    return (
        <>
            <div className='w-full h-screen flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-semibold'>Welcome, {user?.name}!</h1>
                <h2 className='text-2xl font-semibold'>You are logged in as an administrator.</h2>
            </div>
        </>
    );
}

export default AdminHome;
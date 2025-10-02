export const FetchTitles = async () => {
    try {
        const response = await fetch('https://https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php.example.com/data');
        if (!response.ok) throw new Error('Failed to fetch titles');
        const data = await response.json();
        return data.titles || [];
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const fetchProfiles = async (filterTitle = "", search = "", page = 1, limit = 10) => {
    try {
        const response = await fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${filterTitle}&name=${search}&page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch profiles');
        const data = await response.json();
        return Array.isArray(data.profiles) ? data.profiles : Array.isArray(data) ? data : [];
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const fetchAllProfiles = async () => {
    try {
        const response = await fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php`);
        if (!response.ok) throw new Error('Failed to find all profiles');
        const data = await response.json();
        return data.map(user => ({
            id: user.id,
            title: user.name,
            description: user.email,
            image: user.image || 'https://via.placeholder.com/150',
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const fetchProfileById = async (id) => {
    try {
        const response = await fetch('https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}');
        if (!response.ok) throw new Error('Failed to fetch profile by ID');
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};

import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API;

export const Websites = () => {
    const [websiteName, setWebsiteName] = useState("");
    const [websiteURL, setWebsiteURL] = useState("");


    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");

    const nameInput = useRef(null);

    let [websites, setWebsites] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editing) {
            const res = await fetch(`${API}/websites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    websiteName,
                    websiteURL,
                }),
            });
            await res.json();
        } else {
            const res = await fetch(`${API}/websites/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    websiteName,
                    websiteURL,
                }),
            });
            const data = await res.json();
            console.log(data);
            setEditing(false);
            setId("");
        }
        await getWebsites();

        setWebsiteName("");
        setWebsiteURL("");
        nameInput.current.focus();
    };

    const getWebsites = async () => {
        const res = await fetch(`${API}/websites`);
        const data = await res.json();
        setWebsites(data);
    };

    const checkWebsite = async (id) => {
        const res = await fetch(`${API}/websitecheck/${id}`);
        const data = await res.json();
        setId(id);

        
    };

    const deleteWebsites = async (id) => {
        const userResponse = window.confirm("Are you sure you want to delete it?");
        if (userResponse) {
            const res = await fetch(`${API}/websites/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            console.log(data);
            await getWebsites();
        }
    };

    const editWebsite = async (id) => {
        const res = await fetch(`${API}/websites/${id}`);
        const data = await res.json();
        console.log(data)
        setEditing(true);
        setId(id);

        // Reset
        setWebsiteName(data.websiteName);
        setWebsiteURL(data.websiteURL);
        nameInput.current.focus();
    };

    useEffect(() => {
        getWebsites();
        checkWebsite();
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setWebsiteName(e.target.value)}
                            value={websiteName}
                            className="form-control"
                            placeholder="website name"
                            ref={nameInput}
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setWebsiteURL(e.target.value)}
                            value={websiteURL}
                            className="form-control"
                            placeholder="website url"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        {editing ? "Update" : "Create"}
                    </button>
                </form>
            </div>
            <div className="col-md-12">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Status</th>
                            <th>history</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {websites.map((website) => (
                            <tr key={website._id}>
                                <td>{website.websiteName}</td>
                                <td>{website.websiteURL}</td>
                                <td>{website.websiteStatus}</td>
                                <td>{website.websiteHistory}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={(e) => editWebsite(website._id)}
                                    >
                                        Edit
                  </button>
                                    <button
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={(e) => deleteWebsites(website._id)}
                                    >
                                        Delete
                  </button>
                                    <button
                                        className="btn btn-primary btn-sm btn-block"
                                        onClick={(e) => checkWebsite(website._id)}
                                    >
                                        Ping
                  </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

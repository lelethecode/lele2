'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

const ContactForm = () => {
    const [contacts, setContacts] = useState([]);
    const [existingContact, setCurrentContact] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState(existingContact.username || "");
    const [email, setEmail] = useState(existingContact.email || "");
    const [man, setMan] = useState(existingContact.man || "");
    const [ngot, setngot] = useState(existingContact.ngot || "");
    const [password, setPassword] = useState(existingContact.password || "");
    const [cay, setCay] = useState(existingContact.cay || "");
    
    const router = useRouter()

    const updating = Object.entries(existingContact).length !== 0;

    useEffect(() => {
        fetchContacts();
      }, []);

      const fetchContacts = async () => {
        try {
            const response = await fetch("https://app-cjhj.onrender.com/contacts");
            const data = await response.json();
            setContacts(data.contacts);
            console.log(data.contacts);
        } catch (e) {
            console.log("clm", e)
        }
      };

      const updateCallback = () => {
        CloseModal();
        //fetchContacts();
      };
    
      const CloseModal = () => {
        setIsModalOpen(false);
        setCurrentContact({});
      };
    
      const openmodal = () => {
        if (!isModalOpen) setIsModalOpen(true);
      };
    
      const openEditModal = (contact) => {
        if (isModalOpen) return;
        setCurrentContact(contact);
        setIsModalOpen(true);
      };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!username || !email || !password) {
            alert("Username, email, and password are required.");
            return;
        }

        const manValue = parseInt(man);
        const ngotValue = parseInt(ngot);
        const cayValue = parseInt(cay);

        if (isNaN(manValue) || manValue < 0 || manValue > 3 ||
            isNaN(ngotValue) || ngotValue < 0 || ngotValue > 3 ||
            isNaN(cayValue) || cayValue < 0 || cayValue > 3) {
            alert("Values for man, ngot, and cay must be integers between 1 and 3.");
            return;
        }

        const data = {
            username,
            email,
            man: manValue,
            ngot: ngotValue,
            cay: cayValue,
            password,
        };

        console.log("Sending data:", JSON.stringify(data));
        const url = "https://app-cjhj.onrender.com/" + (updating ? `update_contact/${existingContact.id}` : "create_contact");
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || "Something went wrong!");
            } else {
                updateCallback();
                router.push('/home');
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while processing your request.");
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password" // Change to password type for security
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email" // Change to email type for validation
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="man">Độ mặn từ 1 tới 3:</label>
                <input
                    type="number" // Change to number type for input
                    id="man"
                    value={man}
                    onChange={(e) => setMan(e.target.value)}
                    min="0" max="3" // Set min/max for user guidance
                />
            </div>
            <div>
                <label htmlFor="ngot">Độ ngot từ 1 tới 3:</label>
                <input
                    type="number"
                    id="ngot"
                    value={ngot}
                    onChange={(e) => setngot(e.target.value)}
                    min="0" max="3"
                />
            </div>
            <div>
                <label htmlFor="cay">Độ cay từ 1 tới 3:</label>
                <input
                    type="number"
                    id="cay"
                    value={cay}
                    onChange={(e) => setCay(e.target.value)}
                    min="0" max="3"
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default ContactForm;

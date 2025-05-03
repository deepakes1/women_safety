'use client';

import { useState, useEffect } from 'react';
import { FaUserPlus, FaUserTimes, FaCheck } from 'react-icons/fa';


interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  isVerified: boolean;
}

export default function TrustedContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Load contacts from localStorage on component mount
  useEffect(() => {
    const savedContacts = localStorage.getItem('trustedContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('trustedContacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (newContact.name && (newContact.phone || newContact.email)) {
      const contact: Contact = {
        id: Date.now().toString(),
        ...newContact,
        isVerified: false
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: '', phone: '', email: '' });
      setShowAddForm(false);
    }
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const verifyContact = (id: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, isVerified: true } : contact
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Trusted Contacts</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2"
        >
          <FaUserPlus />
          Add Contact
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Add New Contact</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="Contact Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="Email Address"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={addContact}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {contacts.map(contact => (
          <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-medium">{contact.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {contact.phone || contact.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {!contact.isVerified && (
                <button
                  onClick={() => verifyContact(contact.id)}
                  className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full"
                  title="Verify Contact"
                >
                  <FaCheck />
                </button>
              )}
              <button
                onClick={() => removeContact(contact.id)}
                className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
                title="Remove Contact"
              >
                <FaUserTimes />
              </button>
            </div>
          </div>
        ))}
        {contacts.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No trusted contacts added yet. Click &quot;Add Contact&quot; to get started.
          </p>
        )}
      </div>
    </div>
  );
} 
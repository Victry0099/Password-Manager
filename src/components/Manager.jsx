import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const newShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    let passwords = localStorage.getItem("password");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    } else {
    }
  }, []);

  const savePassword = () => {
    if (form.site.trim() === '' || form.username.trim() === '' || form.password.trim() === '') {
      toast.error('Please fill in all required fields.');
      return;
    }
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "password",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    console.log([...passwordArray, form]);
    setForm({ site: "", username: "", password: "" })
  };
  const deletePassword = (id) => {
    console.log(id);
    toast.success("Password deleted successfully", id);

    // Update state and local storage using the callback form of setState
    setPasswordArray((prevPasswordArray) =>
      prevPasswordArray.filter((item) => item.id !== id)
    );
    localStorage.setItem(
      "password",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );
  };

  const editPassword = (id) => {
    // toast.success("Password edited successfully", id);
    console.log("editing password", id)
    setForm(passwordArray.filter(item => item.id === id)[0])
    setPasswordArray(passwordArray.filter((item) => item.id !== id))

  };

  const handleaChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    toast.success("copy to clicked board", text);
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-blue bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="bg-blue-200 mycontainer flex justify-center items-center flex-col">
        <h1 className=" text-4xl font-bold text-center w-32 py-2">
          <span className="text-green-600">&lt;</span>
          Pss
          <span className="text-green-600">OP/&gt;</span>
        </h1>
        <p className="text-green-400 text-lg text-center w-full py-2 font-bold">
          Your own Password Manager
        </p>
        <div className="text-black flex flex-col p-4 justify-center w-full ">
          <input
            className="rounded-full border border-green-600 p-1 px-5 text-lg w-full"
            type="text" 
            value={form.site}
            name="site"
            onChange={handleaChange}
            placeholder="Enter website URL"
            required
          />
          <div className="flex w-full p-4 justify-between items-center gap-4">
            <input
              className="rounded-full border border-green-600 p-1 px-5  text-lg w-full"
              type="text" 
              value={form.username}
              name="username"
              onChange={handleaChange}
              placeholder="Enter Username"
              required
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-600 p-1 px-5 text-lg w-full"
                type={showPassword ? "text" : "password"} 
                value={form.password}
                name="password"
                onChange={handleaChange}
                placeholder="Enter Password" 
                required
              />
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={newShowPassword}
              >
                {showPassword ? (
                  <IoEyeOff className="text-2xl" />
                ) : (
                  <IoEye className="text-2xl" />
                )}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={savePassword}
          className=" gap-2 flex justify-center items-center bg-green-400 w-fit rounded-full py-1 px-3 hover:bg-green-300"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
          ></lord-icon>
          Add Button
        </button>
        <div className="password w-full">
          <h2 className="font-bold text-2xl py-3">Your Password</h2>
          {passwordArray.length === 0 && <div>No passwords to show.</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full ">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-blue-300">
                {passwordArray.map((item, index) => {
                  const { site, username, password } = item;
                  return (
                    <tr key={index}>
                      <td className="text-center w-5/12  py-2 ">
                        <a
                          className="flex items-center justify-center"
                          href={site}
                          target="_blank"
                        >
                          <span>{site}</span>
                          <div
                            className="size-7 cursor-pointer lordiconcopy  "
                            onClick={() => copyText(site)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/slmechys.json"
                              trigger="hover"
                              colors="primary:#110a5c"
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingTop: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </a>
                      </td>
                      <td className="text-center w-5/12 py-2 flex items-center justify-center">
                        <span>{username}</span>
                        <div
                          className="size-7 cursor-pointer lordiconcopy "
                          onClick={() => copyText(username)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/slmechys.json"
                            trigger="hover"
                            colors="primary:#110a5c"
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="text-center w-80 py-2">
                        {/* {showPassword ? password : "********"} */}
                        <div className="flex items-center justify-center">
                          <span>{password}</span>
                          <div
                            className="size-7 cursor-pointer lordiconcopy "
                            onClick={() => copyText(password)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/slmechys.json"
                              trigger="hover"
                              colors="primary:#110a5c"
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingTop: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-5/12 py-2 flex items-center justify-center">
                        <span
                          className="cursor-pointer mr-3"
                          onClick={() => {editPassword(item.id)}}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xunzgeah.json"
                            trigger="hover"
                            colors="primary:#16c72e"
                            style={{ width: "30px", height: "30px" }}
                          ></lord-icon>
                        </span>

                        <span
                          className="cursor-pointer"
                          onClick={() => deletePassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                            colors="primary:#c71f16"
                            style={{ width: "30px", height: "30px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;

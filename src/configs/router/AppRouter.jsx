import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Band,
  BandForm,
  Dashboard,
  EventDetail,
  Events,
  EventsForm,
  Landing,
  Login,
  NotFoundPage,
  Profile,
  Register,
  UserProfile,
  Users,
  UsersFrom
} from "../../pages";
import { useSelector } from "react-redux";
import UsersForm from "../../pages/users/UsersFrom";

const AppRouter = () => {
  const uc = useSelector((state) => state.userCredential);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/event-scheduled/:eventname" element={<EventDetail />} />
          <Route path="*" element={<NotFoundPage />} />

          {uc.noLogin ? (
            <Fragment>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
            </Fragment>
          ) : (
            <Fragment>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bands" element={<Band />} />
              <Route path="/bands/add-band" element={<BandForm />} />
              <Route path="/bands/update-band/:bid" element={<BandForm />} />
              <Route path="/event" element={<Events />} />
              <Route path="/event/add-event" element={<EventsForm />} />
              <Route path="/event/update-event/:eid" element={<EventsForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/update-users/:uid" element={<UsersForm />} />
              <Route path="/users/add-user" element={<UsersFrom />} />
              <Route path="/users/profile/:uid" element={<UserProfile />} />
            </Fragment>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;

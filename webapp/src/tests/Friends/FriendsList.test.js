import FriendsList from "../../components/Friends/FriendsList";
import {render, screen, waitFor} from "@testing-library/react";
import { listFriends, getFriendInfo, deleteFriend } from "../../components/Pods/PodsFunctions";
import React from 'react';

//change the webId to mine that has no friends
jest.mock("@inrupt/solid-ui-react", () => ({
    useSession: () => ({
      session: {
        info: {
          webId: "https://ferjota.inrupt.net/profile/card#me",
        },
      },
    }),
  }));

jest.mock("../../components/Pods/PodsFunctions", () => ({
  listFriends: jest.fn(),
  getFriendInfo: jest.fn(),
  deleteFriend: jest.fn(),
}));

describe("FriendsList", () => {
    test("renders FriendsList component and it's calls", async () => {
      listFriends.mockResolvedValue(["friend1"]);
      getFriendInfo.mockResolvedValue({ name: "Friend1" });
  
      render(<FriendsList handleLoad={ r => r}/>); // Render the FriendsList component
  
      await waitFor(() => expect(listFriends).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(getFriendInfo).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(deleteFriend).toHaveBeenCalledTimes(0));

      expect(screen.getByText("Friend1")).toBeInTheDocument();
    });
}); 
import { tokenAtom } from "@/src/state/states";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

  const header = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ii1iUVVmVnlqTFpTOXNKT3RVVGZQTCJ9.eyJpc3MiOiJodHRwczovL3Byb2RvbWluaWNhbmEudXMuYXV0aDAuY29tLyIsInN1YiI6InJyTHRUSFdMM1paZ1NvdG5Rd2NaUXl2WEh3VXZmVjV0QGNsaWVudHMiLCJhdWQiOiJodHRwczovL3Byb2RvbWluaWNhbmEudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2OTgyNDg0NjIsImV4cCI6MTY5ODMzNDg2MiwiYXpwIjoicnJMdFRIV0wzWlpnU290blF3Y1pReXZYSHdVdmZWNXQiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbnNfc3VtbWFyeSBjcmVhdGU6YWN0aW9uc19sb2dfc2Vzc2lvbnMgY3JlYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDphdXRoZW50aWNhdGlvbl9tZXRob2RzIHVwZGF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIGRlbGV0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6Y2xpZW50X2NyZWRlbnRpYWxzIGNyZWF0ZTpjbGllbnRfY3JlZGVudGlhbHMgdXBkYXRlOmNsaWVudF9jcmVkZW50aWFscyBkZWxldGU6Y2xpZW50X2NyZWRlbnRpYWxzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.kKoT31JrKRIJUlwIb5uxyjWFC8ScrYJuFANozc3orFG4q4kKisaFs-eqpKKzMXPKOHCzi4p7EWHyI8m1WcDS_5AmnFcwgJv1Nj4THCvh029Vx0ngibSoICFcFiUwJVIa4HZNdL_pikoz0CgDobhZxkeuCfAkIeCUiptg42ssjlg1wJ-P1E-apX9Kl0HravfoOD64Ie7UInOaMdawXwmEzU2-3FwgDKJeHpAHWEHsbr7omTDcUqDOvNInk6nXKsSf-aFJSs-Z5ellb6czgW9ejRGzeAn1Nnc4HmpWihmFvLOvkMXysHBnydHutV1V-8SX0w3M-DXsAyo_-BOVqAuBfQ`
      },
  };

interface AssignUsersRolesProps {
  id: String;
  data: {
    roles: String[];
  };
  handleOpen: () => void;
  updateUser: () => void;
}



export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`;
      const { data } = await axios.get(url, header);
      return data;
    },
  });
}

export function useUsersPermissions(id: String) {
  if(!id) return { data: null }
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}/permissions`;
      const { data } = await axios.get(url, header);
      return data;
    },
  });
}

export function useUserRoles(id: String) {
  return useQuery({
    queryKey: ["usersRoles"],
    queryFn: async () => {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}/roles`;
      const { data } = await axios.get(url, header);
      return data;
    },
  });
}

export function useRoles() {
  return useQuery({
    queryKey: ["Roles"],
    queryFn: async () => {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/roles`;
      const { data } = await axios.get(url, header);
      return data;
    },
  });
}

export function assignUserRoles({
  id,
  data,
  handleOpen,
  updateUser,
}: AssignUsersRolesProps) {
  return axios
    .post(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}/roles`,
      data,
      header
    )

    .then((res) => {
      if (res.status === 204) {
        notifications.show({
          id: "saim",
          autoClose: 5000,
          withCloseButton: false,
          title: "Roles asignados",
          message: "Se han actualizado los roles del usuario",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateUser();
      } else {
        notifications.show({
          id: "saim",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message:
            "No se ha podido asignar los roles al usuario, favor intente de nuevo.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function removeUserRoles({
  id,
  data,
  handleOpen,
  updateUser,
}: AssignUsersRolesProps) {
  return axios
    .delete(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}/roles`, {
      ...header,
      data,
    })

    .then((res) => {
      if (res.status === 204) {
        notifications.show({
          id: "saim",
          autoClose: 5000,
          withCloseButton: false,
          title: "Roles eliminados",
          message: "Se han actualizado los roles del usuario",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateUser();
      } else {
        notifications.show({
          id: "saim",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message:
            "No se ha podido eliminar los roles al usuario, favor intente de nuevo.",
          color: "red",
          loading: false,
        });
      }
    });
}

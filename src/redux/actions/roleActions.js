import api from "../../services/api";
import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
} from "../actionTypes/roleTypes";

const getRolesRequest = () => ({
  type: GET_ROLES_REQUEST,
});

const getRolesSuccess = (roles) => ({
  type: GET_ROLES_SUCCESS,
  payload: roles,
});

const getRolesFailure = (error) => ({
  type: GET_ROLES_FAILURE,
  payload: error,
});

// Thunk action creator
export const getRoles = () => async (dispatch, getState) => {
  // Rollerin zaten yüklenip yüklenmediğini kontrol et
  const { isRolesLoaded } = getState().role;

  // Eğer roller zaten yüklenmişse, tekrar API çağrısı yapma
  if (isRolesLoaded) return;

  try {
    dispatch(getRolesRequest());
    const response = await api.get("/roles");
    dispatch(getRolesSuccess(response.data));
  } catch (error) {
    console.error("Roller yüklenirken hata oluştu:", error);
    dispatch(
      getRolesFailure(
        error.response?.data?.message || "Roller yüklenirken bir hata oluştu",
      ),
    );
  }
};

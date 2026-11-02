import axios from "axios";
import { api, BASE_URL } from "./config";

export const getSearchSuggestions = async (query) => {
    try {
      const response = await api.get("users/search/suggestions", {
        params: {
          q: query,
          limit: 5,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error(
        "getSearchSuggestions error:",
        error?.response?.data || error.message
      );
  
      throw error;
    }
  };


// =========================================================
// DEEP SEARCH
// =========================================================

export const deepSearch = async ({
  query,
  type = "people",
  page = 1,
  limit = 20,
}) => {
  try {

    const response = await api.get(
      `users/search/deep`,
      {
        params: {
          q: query,
          type,
          page,
          limit,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "deepSearch error:",
      error
    );

    throw error;
  }
};

// share

export const shareWithFriends = async ({
  receiverIds,
  sharedType,
  sharedId,
  sharedName,
  sharedCategory,
  metadata = {},
}) => {
  try {
    const response = await api.post("users/share", {
      receiverIds,
      sharedType,
      sharedId,
      sharedName,
      metadata,
      sharedCategory,
    });
    return response.data;
  } catch (error) {
    console.log(
      "SHARE WITH FRIENDS API ERROR:",
      error?.response?.data || error.message
    );

    throw error;
  }
};

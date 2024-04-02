import { FormControl, Input, InputAdornment } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchText } from "../store/slices/productSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state) => state.product);
  return (
    <FormControl variant="standard">
      <Input
        type="search"
        value={searchText}
        onChange={(event) => {
          const searchText = event?.target?.value;
          dispatch(updateSearchText(searchText));
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchBar;

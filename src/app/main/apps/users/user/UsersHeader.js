import FuseAnimate from "@fuse/core/FuseAnimate";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import {
  setProductsSearchText,
  getUsers,
  selectUsers,
} from "../store/userSlice";
import { openUserDialog } from "../store/userSlice";
import { showMessage } from "app/store/fuse/messageSlice";

function ProductsHeader(props) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(5);
  const searchText = useSelector(({ users }) => users.users.searchText);
  const mainTheme = useSelector(selectMainTheme);
  const products = useSelector(selectUsers);

  function addNewUser() {
    if (count >= products.length) {
      dispatch(openUserDialog());
    } else {
      dispatch(
        showMessage({
          message:
            "You can't add member anymore. Please upgrade the subscription plan.",
        })
      );
    }
  }

  useEffect(() => {
    if (products) {
      products.map((item) => {
        if (Object.keys(item).includes("subscriptionInfo")) {
          console.log(item.subscriptionInfo);
          if (Object.keys(item.subscriptionInfo).includes("secondResponse")) {
            setCount(
              count + parseInt(item.subscriptionInfo.secondResponse.quantity)
            );
          }
        }
      });
    }
  }, [products]);

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Icon className="text-32">people</Icon>
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
            Custom Setup for Bonus Plan & Count Toward Team Bonus
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <ThemeProvider theme={mainTheme}>
          <FuseAnimate animation="transition.slideDownIn" delay={300}>
            <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8 shadow">
              <Icon color="action">search</Icon>

              <Input
                placeholder="Search"
                className="flex flex-1 mx-8"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={(ev) => dispatch(setProductsSearchText(ev))}
              />
            </Paper>
          </FuseAnimate>
        </ThemeProvider>
      </div>
      <FuseAnimate animation="transition.slideRightIn" delay={300}>
        <Button
          component={Link}
          className="whitespace-nowrap normal-case"
          variant="contained"
          color="secondary"
          onClick={addNewUser}
        >
          <span className="hidden sm:flex">Add</span>
        </Button>
      </FuseAnimate>
    </div>
  );
}

export default ProductsHeader;

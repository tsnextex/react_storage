import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";
import { getToken } from "../../../helpers";
import HOMESEARCH_QUERY from "../../../graphql/queries/homeSearch";
import { gqlRequest } from "../../../utils";

export default function Asynchronous() {

  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;
    const token = getToken();

    if (!loading) {
      return undefined;
    }

    // let p0 = token
    //   ? token.then((res) => gqlRequest(client, HOMESEARCH_QUERY(inputValue)))
    //   : null;

    // Promise.all([p0]).then((raw) => {
    //   const craw = raw[0];
    //   const rawResults = _.chain(craw)
    //     .get(["data", "searchByCityStateZip"])
    //     .value();
    //   console.log(rawResults);
    //   let results = [];
    //   console.log(results);
    //   setOptions(rawResults);
    // });

    return () => {
      active = false;
    };
  }, [inputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.city === value}
      getOptionLabel={(option) => option.city}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          style={{}}
          {...params}
          value={inputValue}
          onKeyUp={(e) => setInputValue(e.target.value)}
          label="Search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

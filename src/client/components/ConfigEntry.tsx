import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import PropTypes from "prop-types";

function ConfigEntry({ configs, setConfigs, index }) {
  const [age, setAge] = React.useState("");

  const handleFormChange = (index, event) => {
    const data = [...configs];
    data[index][event.target.name] = event.target.value;
    setConfigs(data);
  };

  const removeFields = (index) => {
    const data = [...configs];
    data.splice(index, 1);
    setConfigs(data);
  };

  return (
    <>
      <div>
        {/* <Grid
        container
        spacing={2}
        component="form"
        autoComplete="off"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
      > */}

        <Grid item xs={4}>
          <Box width="100%">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Configuration Options
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                name="config"
                onChange={(event) => handleFormChange(index, event)}
              >
                <MenuItem value="cleanup.policy">cleanup.policy</MenuItem>
                <MenuItem value="compression.type">compression.type</MenuItem>
                <MenuItem value="delete.retention.ms">
                  delete.retention.ms
                </MenuItem>
                <MenuItem value="file.delete.delay.ms">
                  file.delete.delay.ms
                </MenuItem>
                <MenuItem value="flush.messages">flush.messages</MenuItem>
                <MenuItem value="flush.ms">flush.ms</MenuItem>
                <MenuItem value="follower.replication.throttled.replicas">
                  follower.replication.throttled.replicas
                </MenuItem>
                <MenuItem value="index.interval.bytes">
                  index.interval.bytes
                </MenuItem>
                <MenuItem value="leader.replication.throttled.replicas">
                  leader.replication.throttled.replicas
                </MenuItem>
                <MenuItem value="max.compaction.lag.ms">
                  max.compaction.lag.ms
                </MenuItem>
                <MenuItem value="max.message.bytes">max.message.bytes</MenuItem>
                <MenuItem value="message.format.version">
                  message.format.version
                </MenuItem>
                <MenuItem value="message.timestamp.difference.max.ms">
                  message.timestamp.difference.max.ms
                </MenuItem>
                <MenuItem value="message.timestamp.type">
                  message.timestamp.type
                </MenuItem>
                <MenuItem value="min.cleanable.dirty.ratio">
                  min.cleanable.dirty.ratio
                </MenuItem>
                <MenuItem value="min.compaction.lag.ms">
                  min.compaction.lag.ms
                </MenuItem>
                <MenuItem value="min.insync.replicas">
                  min.insync.replicas
                </MenuItem>
                <MenuItem value="preallocate">preallocate</MenuItem>
                <MenuItem value="retention.bytes">retention.bytes</MenuItem>
                <MenuItem value="retention.ms">retention.ms</MenuItem>
                <MenuItem value="segment.bytes">segment.bytes</MenuItem>
                <MenuItem value="segment.index.bytes">
                  segment.index.bytes
                </MenuItem>
                <MenuItem value="segment.jitter.ms">segment.jitter.ms</MenuItem>
                <MenuItem value="segment.ms">segment.ms</MenuItem>
                <MenuItem value="unclean.leader.election.enable">
                  unclean.leader.election.enable
                </MenuItem>
                <MenuItem value="message.downconversion.enable">
                  message.downconversion.enable
                </MenuItem>
                <MenuItem value="confluent.key.schema.validation">
                  confluent.key.schema.validation
                </MenuItem>
              </Select>
            </FormControl>

            <Grid item xs={4} justifyContent="flex-end">
              <TextField
                id="outlined-basic"
                label="value"
                variant="outlined"
                name="value"
                onChange={(event) => handleFormChange(index, event)}
              />
            </Grid>
            <Grid item xs={4} justifyContent="flex-end">
              <Button variant="contained" onClick={() => removeFields(index)}>
                Remove
              </Button>
            </Grid>
          </Box>
        </Grid>

        {/* </Grid> */}
      </div>
    </>
  );
}

ConfigEntry.propTypes = {
  configs: PropTypes.arrayOf(PropTypes.object),
  setConfigs: PropTypes.func,
  index: PropTypes.number,
};

export default ConfigEntry;
//{<TextField id="outlined-basic" value={props.value} onChange={e => props.setValue(e.target.value)} variant="outlined" />}

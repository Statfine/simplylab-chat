import { memo, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Snackbar,
} from "@mui/material";

import { checkAppKey } from "../../services/checkAppKey";

export interface DefaultModalProps {
  open: boolean;
  onSubmit: (key: string) => void;
}

/** 默认key */
const DEFAULT_KEY =
  "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";

const AppKeyDialog: React.FC<DefaultModalProps> = ({ open, onSubmit }) => {
  const [error, setError] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");

  const handleSubmit = async (value?: string) => {
    setChecking(true);
    try {
      const paramKey = value || key;
      const { data } = await checkAppKey(paramKey);
      if (data && data.limit) onSubmit(paramKey);
      else setError(true);
    } catch (error) {
    } finally {
      setChecking(false);
    }
  };

  const handleCloseError = (event: any, reason: any) => {
    if (reason === "clickaway") return;
    setError(false);
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          请输入OpenRouter AppKey
        </DialogTitle>
        <DialogContent>
          <p>
            使用里面提供的免费model “Mistral 7B Instruct”作为ai
            provider，以此为基础开发聊天对话机器人
          </p>
          <p>此处为https://openrouter.ai申请的key</p>
          <Input
            autoFocus
            placeholder="请输入openrouter AppKey"
            className="w-full"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit()} disabled={checking || key.trim().length === 0}>
            确定
          </Button>
          <Button onClick={() => handleSubmit(DEFAULT_KEY)} disabled={checking}>
            使用默认key
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">AppKey 无效</Alert>
      </Snackbar>
    </>
  );
};

/**
 * 弹框-设置appkey
 */
export default memo(AppKeyDialog);

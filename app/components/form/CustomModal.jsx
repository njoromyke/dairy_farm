import * as React from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  useTheme,
} from "react-native-paper";

const CustomModal = ({ children, showModal, hideModal }) => {
  const [visible, setVisible] = React.useState(false);
  const { colors } = useTheme();

  const containerStyle = {
    backgroundColor: colors.background,
    padding: 20,
    flex: 0.5,
  };

  return (
    <Portal>
      <>
        <Modal
          visible={showModal}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {children}
        </Modal>
      </>
    </Portal>
  );
};

export default CustomModal;

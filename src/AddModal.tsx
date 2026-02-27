type AddModalProps = {
  setOpen: (arg0: boolean) => void;
  isOpen: boolean;
  children?: React.ReactNode;
};

const AddModal = (props: AddModalProps) => {
  const { isOpen, setOpen } = props;

  if(!isOpen) {
    return;
  }

  return (
    <>
      <div className="backdrop"></div>
      <div className="add-modal">
      {props.children}
      <br />
      <button type={'button'} onClick={() => setOpen(false)}>Close</button>
      </div>
    </>
  )
};

export default AddModal
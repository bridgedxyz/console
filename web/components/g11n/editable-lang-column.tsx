import React from "react";
import { selector, useRecoilValue } from "recoil";
import { Typography, Input } from "@material-ui/core";

import { langColumns, dummyData } from "../../recoil";

import IconEn from "../../asset/lang-icon-en";
import IconKr from "../../asset/lang-icon-kr";
import IconJp from "../../asset/lang-icon-jp";

const EditableLangColumn = () => {
  const langIcon = (type: string) => {
    if (type == "en") return <IconEn />;
    if (type === "ko") return <IconKr />;
    if (type == "jp") return <IconJp />;
  };

  return (
    <>
      <div>
        <div>{langIcon("en")}</div>
        <div>
          <Input defaultValue="u" disabled={true} />
        </div>
        <div>
          <Typography>jp/JP</Typography>
        </div>
      </div>
    </>
  );
};

export default EditableLangColumn;

import withProtected from "@/routes/withProtected";
import React from "react";

const ProtectedPage = () => {
	return <div>This is hidden</div>;
};

export default withProtected(ProtectedPage);

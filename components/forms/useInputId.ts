import { useId, useMemo } from "react";

const useInputId = (name?: string) => {
	const inputId = useId();
	return useMemo(() => name || `input-${inputId}`, [name, inputId]);
};

export default useInputId;

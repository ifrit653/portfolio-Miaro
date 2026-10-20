import { VisuallyHidden } from "radix-ui";
import ProcessPanel from "./ProcessPanel";
import { PROCESSES } from "../../data/processes";
import { useI18n } from "../../i18n/useI18n";

export default function ProcessPinned({ onOpen }) {
  const { t } = useI18n();

  return (
    <>
      <VisuallyHidden.Root asChild>
        <h2>{t("process.title")}</h2>
      </VisuallyHidden.Root>

      {PROCESSES.map((process, i) => (
        <ProcessPanel
          key={process.id}
          process={process}
          index={i}
          total={PROCESSES.length}
          onOpen={onOpen}
        />
      ))}
    </>
  );
}

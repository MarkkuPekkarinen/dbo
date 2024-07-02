import api from '@/api';
import ContextMenu from '@/components/base/ContextMenu/ContextMenu';
import { MenuType } from '@/components/base/ContextMenu/types';
import { TabMode } from '@/core/enums';
import { useCopyToClipboard } from '@/hooks';
import useAPI from '@/hooks/useApi.hook';
import locales from '@/locales';
import { useConfirmModalStore } from '@/store/confirmModal/confirmModal.store';
import { useTabStore } from '@/store/tabStore/tab.store';
import { toast } from 'sonner';
import { SavedQueryContextMenuProps } from '../../types';

export default function SavedQueryContextMenu({
  query,
  contextMenu,
  onClose,
  onDelete,
  onChange
}: SavedQueryContextMenuProps) {
  const [_, copy] = useCopyToClipboard();
  const { addTab } = useTabStore();

  const showModal = useConfirmModalStore((state) => state.show);

  const { request: deleteSavedQuery, pending: pendingDelete } = useAPI({
    apiMethod: api.savedQueries.deleteSavedQuery
  });

  const handleDelete = async () => {
    if (pendingDelete) {
      return;
    }
    showModal(locales.delete_action, locales.query_saved_delete_confirm, async () => {
      try {
        await deleteSavedQuery(query.id);
        toast.success(locales.database_delete_success);
        onDelete();
      } catch (err) {
        console.log('🚀 ~ handleSaveChange ~ err:', err);
      }
    });
  };

  const handleCopy = async () => {
    try {
      await copy(query.query);
      toast.success(locales.database_delete_success);
    } catch (error) {
      console.log('🚀 ~ handleCopy ~ error:', error);
    }
  };

  const handleRun = () => {
    const name = query.name.slice(0, 10);
    addTab(name, TabMode.Query, query.query);
  };

  const menu: MenuType[] = [
    {
      name: locales.run,
      icon: 'play',
      action: handleRun,
      closeAfterAction: true
    },
    {
      name: locales.copy,
      icon: 'copy',
      action: handleCopy,
      closeAfterAction: true
    },
    {
      name: locales.rename,
      icon: 'pen',
      action: onChange
    },
    {
      name: locales.delete,
      icon: 'delete',
      action: handleDelete,
      closeBeforeAction: true
    }
  ];

  return <ContextMenu menu={menu} contextMenu={contextMenu} onClose={onClose} />;
}

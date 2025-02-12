import CustomIcon from '@/components/base/CustomIcon/CustomIcon';
import locales from '@/locales';
import { useDataStore } from '@/store/dataStore/data.store';
import { useTabStore } from '@/store/tabStore/tab.store';
import type { SortType } from '@/types';
import { Box, Button } from '@mui/material';
import { v4 as uuid } from 'uuid';
import AddSortButton from './SortItem/AddSortButton/AddSortButton.tsx';
import SortItem from './SortItem/SortItem.tsx';

export default function Sorts() {
  const { getSelectedTab } = useTabStore();
  const { getColumns, runQuery } = useDataStore();

  return (
    <Box id='#sorts' p={1} borderBottom={(theme) => `1px solid ${theme.palette.divider}`}>
      {getSelectedTab()?.sorts.length === 0 ? (
        <AddSortButton columns={getColumns()} />
      ) : (
        getSelectedTab()?.sorts.map((sort: SortType) => {
          return <SortItem key={uuid()} columns={getColumns()} sort={sort} />;
        })
      )}

      {(getSelectedTab()?.sorts?.length ?? 0) > 0 && (
        <Box display='flex' justifyContent='flex-start' mx={1} mt={1}>
          <Button onClick={runQuery} size='small' variant='outlined' endIcon={<CustomIcon type='check' size='xs' />}>
            {locales.apply}
          </Button>
        </Box>
      )}
    </Box>
  );
}

import { useEffect } from 'react';

import './vzn_list.scss';
import VznItem from './VznItem/VznItem.tsx';
import MainLayout from '../../layouts/MainLayout.tsx';
import { useVznListStore } from '../../stores/useVznListStore.ts';
import { useAuthStore } from '../../stores/useAuthStore.ts';
import { useDivisionsStore } from '@/stores/useDivisionsStore.ts';

const VznList: React.FC = () => {
  const { vznList, loading, error } = useVznListStore();
  const { divisions, fetchDivisions } = useDivisionsStore();
  const authToken = useAuthStore((state) => state.authToken);

  useEffect(() => {
    if (authToken) {
      fetchDivisions(authToken);
    }
  }, [authToken,fetchDivisions]);


  return (
    <div className="modal" id="consumption">
      <MainLayout
        headline="ВЗН УП (Расход)"
        showCloseButton={false}
        hasBorder={false}
        isBlueBackground={false}
        centralButton
        rightButton
      >
        {loading ? <p>Загрузка...</p> : null}
        {error ? <p>{error}</p> : null}

        {!loading && !error && (
          <ul className="list_vzn" id="list">
            {vznList.map((item) => (
              <VznItem key={item.Code} item={item} divisions={divisions}/>
            ))}
          </ul>
        )}
      </MainLayout>
    </div>
  );
};

export default VznList;

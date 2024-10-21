import { useEffect } from 'react';

import './vzn_list.scss';
import VznItem from './VznItem/VznItem.tsx';
import MainLayout from '../../layouts/MainLayout.tsx';
import { useVznStore } from '../../stores/useVznStore.ts';
import { useAuthStore } from '../../stores/useAuthStore.ts';

const VznList: React.FC = () => {
  const { vznList, loading, error, fetchVznList } = useVznStore();
  const authToken = useAuthStore((state) => state.authToken);

  useEffect(() => {
    if (authToken) {
      const filters = {
        Codes: [123, 456],        // Коды
        Num: "123%",              // Маска номера
        GatheringContCode: 1,     // Код состава КВ
      };
      fetchVznList(authToken, filters);
    }
  }, [authToken, fetchVznList]);

  return (
    <div className="modal" id="consumption">
      <MainLayout
        headline="ВЗН УП (Расход)"
        showCloseButton={false}
        hasBorder={false}
        isBlueBackground={false}
      >
        {loading ? <p>Загрузка...</p> : null}
        {error ? <p>{error}</p> : null}

        {!loading && !error && (
          <ul className="list_vzn" id="list">
            {vznList.map((item) => (
              <li key={item.id}>
                <VznItem item={item} />
              </li>
            ))}
          </ul>
        )}
      </MainLayout>
    </div>
  );
};

export default VznList;
